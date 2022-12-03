using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Domain.MetaData;
using Sabio.Models.Requests.Events;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class EventService : IEventService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public EventService(IAuthenticationService<int> authenticationService, IDataProvider dataProvider)
        {
            _authenticationService = authenticationService;
            _dataProvider = dataProvider;
        }

        public Paged<Event> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Events_SelectAll]";
            Paged<Event> pagedList = null;
            List<Event> list = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Event aEvent = MapSingleEvent(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Event>();
                    }
                    list.Add(aEvent);
                });
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public int Create(EventsAddRequest model)
        {
            int id = 0; 
            string procName = "[dbo].[Events_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object oId = returnCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id); 
                });

            return id; 
        }
        public void Update(EventsUpdateRequest model)
        {
            string procName = "[dbo].[Events_Update]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                }, returnParameters: null);
        }
        public Paged<Event> Search(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Events_Search]";
            int totalCount = 0; 
            Paged<Event> pagedList = null;
            List<Event> list = null;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Event aEvent = MapSingleEvent(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++); 
                    if (list == null)
                    {
                        list = new List<Event>();
                        
                    }
                    list.Add(aEvent);
                });
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount); 
            }
            return pagedList; 
        }
        public List<Event> Search_Geo(double latitude, double longitude, double radius)
        {
            string procName = "[dbo].[Events_Search_Geo]";
            List<Event> list = null;

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@lat", latitude);
                    parameterCollection.AddWithValue("@lng", longitude);
                    parameterCollection.AddWithValue("@radius", radius);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Event aEvent = MapSingleEvent(reader, ref startingIndex);

                    if (list == null)
                    {
                        list = new List<Event>();
                    }
                    list.Add(aEvent);
                });

            return list;
        }
        public Paged<Event> SelectAllUserEvents(int pageIndex, int pageSize, int userId)
        {
            string procName = "[dbo].[UserEvents_SelectAll]";
            int totalCount = 0;
            Paged<Event> pagedList = null;
            List<Event> list = null;

            _dataProvider.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@UserId", userId);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Event aEvent = MapSingleEvent(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);
                    if (list == null)
                    {
                        list = new List<Event>();

                    }
                    list.Add(aEvent);
                });
            if (list != null)
            {
                pagedList = new Paged<Event>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void UserEventAdd(int userId, int eventId)
        {
            string procName = "[dbo].[UserEvents_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@EventId", eventId);
                }, returnParameters: null);
        }

        public void DeleteUserEvent(int userId, int eventId)
        {
            string procName = "[dbo].[UserEvents_DeleteById]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@EventId", eventId);
                }, returnParameters: null);
        }



        private static Event MapSingleEvent(IDataReader reader, ref int startingIndex)
        {
            Event aEvent = new Event();

            aEvent.Id = reader.GetSafeInt32(startingIndex++);
            aEvent.Name = reader.GetSafeString(startingIndex++);
            aEvent.Headline = reader.GetSafeString(startingIndex++);
            aEvent.Description = reader.GetSafeString(startingIndex++);
            aEvent.Summary = reader.GetSafeString(startingIndex++);
            aEvent.Slug = reader.GetSafeString(startingIndex++);
            aEvent.ImageUrl = reader.GetSafeString(startingIndex++);
            aEvent.CreatedBy = reader.GetSafeInt32(startingIndex++); 
            aEvent.MetaData = reader.DeserializeObject<List<MetaDatum>>(startingIndex++);
            aEvent.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aEvent.DateModified = reader.GetSafeDateTime(startingIndex++);
            return aEvent;
        }
        private static void AddCommonParams(EventsAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@HeadLine", model.Headline);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
            col.AddWithValue("@BuildingNumber", model.BuildingNumber);
            col.AddWithValue("@Street", model.Street);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@State", model.State);
            col.AddWithValue("@ZipCode", model.ZipCode);
        }
    }
}
