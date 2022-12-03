using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Roles;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authService, IDataProvider dataProvider)
        {
            _authenticationService = authService;
            _dataProvider = dataProvider;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }

        #region - DO NOT REMOVE - DO NOT EDIT - EVER


        /// <summary>
        /// ** This method should never be removed from this Interface or this class **
        /// An Instructor will remove it when appropriate.
        /// If you ever do anything to break this method, you need to fix it right away.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="id"></param>
        /// <param name="roles"></param>
        /// <returns></returns>
        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Content Manager" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        #endregion

        public int Create(UserAddRequest userModel)
        {
            int userId = 0;
            string password = userModel.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            string procName = "[dbo].[Users_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@FirstName", userModel.FirstName);
                    col.AddWithValue("@LastName", userModel.LastName);
                    col.AddWithValue("@Email", userModel.Email);
                    col.AddWithValue("@Password", hashedPassword);
                    col.AddWithValue("@Dob", userModel.Dob);
                    col.AddWithValue("@AvatarUrl", userModel.AvatarUrl);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = System.Data.ParameterDirection.Output;

                    col.Add(idOut); 
                }, returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object objectId = returnCol["@Id"].Value;
                    int.TryParse(objectId.ToString(), out userId); 
                });

            return userId;
        }

        private IUserAuthData Get(string email, string password)
        {
            UserBase user = null;
            UserAuthData authData = null;
            string procName = "[dbo].[Users_Select_AuthData]";

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Email", email); 
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    authData = new UserAuthData();

                    authData.Id = reader.GetSafeInt32(startingIndex++);
                    authData.Email = reader.GetSafeString(startingIndex++);
                    authData.Password = reader.GetSafeString(startingIndex++); 
                    authData.Roles = reader.DeserializeObject<List<Role>>(startingIndex++);
                });
            
            if (authData != null)
            {
                bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, authData.Password);

                if (isValidCredentials)
                {
                    user = new UserBase();
                    user.Id = authData.Id;
                    user.Name = authData.Email;
                    user.Roles = authData.Roles.Select(x => x.Name).ToArray();
                    user.TenantId = Guid.NewGuid().ToString(); 
                }
            }

            return user;
        }
        public User GetById(int id)
        {
            string procName = "[dbo].[Users_SelectById]";

            User aUser = null;

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aUser = MapSingleUser(reader, ref startingIndex);
                });

            return aUser;
        }

        public Paged<User> GetAll(int pageIndex, int pageSize)
        {
            Paged<User> pagedList = null;
            List<User> list = null;
            string procName = "[dbo].[Users_SelectAll]";
            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    User aUser = MapSingleUser(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);
                    if (list == null)
                    {
                        list = new List<User>();
                    }
                    list.Add(aUser);
                });
            if (list != null)
            {
                pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public User MapSingleUser(IDataReader reader, ref int startingIndex)
        {
            User aUser = new User();

            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.FirstName = reader.GetSafeString(startingIndex++);
            aUser.LastName = reader.GetSafeString(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.Dob = reader.GetSafeDateTime(startingIndex++); 
            aUser.AvatarUrl = reader.GetSafeString(startingIndex++);
            aUser.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aUser.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aUser;
        }
    }
}