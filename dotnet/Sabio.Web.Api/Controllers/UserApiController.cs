using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserService _userService;
        private IAuthenticationService<int> _authService = null;


        public UserApiController(IUserService userService,
            IAuthenticationService<int> authService,
            ILogger<PingApiController> logger) : base(logger)
        {
            _userService = userService;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                int id = _userService.Create(model);

                if (id > 0)
                {
                    response = new ItemResponse<int> { Item = id }; 
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }

            return StatusCode(code, response); 
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<SuccessResponse> Login(UserLoginRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                bool isValidCredentials = _userService.LogInAsync(model.Email, model.Password).Result;

                if (isValidCredentials != false)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 401;
                    response = new ErrorResponse("Incorrect email or password.");
                }

            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("logout")]
        public async Task<ActionResult<SuccessResponse>> Logout()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                bool isLoggedIn = _authService.IsLoggedIn();

                if (isLoggedIn)
                {
                    await _authService.LogOutAsync();
                    response = new SuccessResponse();
                }
                else
                {
                    code = 400;
                    response = new ErrorResponse("App resource not found.");

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [AllowAnonymous]
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<User>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                User user = _userService.GetById(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<User> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        [AllowAnonymous]
        [HttpGet("current")]
        public ActionResult<ItemResponse<IUserAuthData>> GetCurrentUser()
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                IUserAuthData user = _authService.GetCurrentUser(); 

                if (user != null)
                {
                    response = new ItemResponse<IUserAuthData> { Item = user }; 
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Current user not found."); 
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }
            return StatusCode(code, response); 
        }

    }
}
