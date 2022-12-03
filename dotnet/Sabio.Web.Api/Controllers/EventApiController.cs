using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventApiController : BaseApiController
    {
        private IAuthenticationService _authService;
        private IEventService _eventService;

        public EventApiController(IAuthenticationService authService, IEventService eventService, ILogger<PingApiController> logger) : base (logger)
        {
            _authService = authService;
            _eventService = eventService;
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<Paged<Event>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Event> pagedEvents = _eventService.GetAll(pageIndex, pageSize);

                if (pagedEvents != null)
                {
                    response = new ItemResponse<Paged<Event>> { Item = pagedEvents };
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("App Response not found."); 
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }

            return StatusCode(code, response); 
        }
        [HttpPost]
        public ActionResult<int> Add(EventsAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _eventService.Create(model); 

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
        [HttpGet("myevents")]
        public ActionResult<Paged<Event>> MyEvents(int pageIndex, int pageSize, int userId)
        {
            int code = 200;
            BaseResponse response = null;
            Paged<Event> pagedEvents = null;

            try
            {
                pagedEvents = _eventService.SelectAllUserEvents(pageIndex, pageSize, userId);

                if (pagedEvents != null)
                {
                    response = new ItemResponse<Paged<Event>> { Item = pagedEvents }; 
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message); 
            }
            return StatusCode(code, response); 
        }
        [AllowAnonymous]
        [HttpGet("search")]
        public ActionResult<Paged<Event>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            Paged<Event> pagedEvents = null;

            try
            {
                pagedEvents = _eventService.Search(pageIndex, pageSize, query);

                if (pagedEvents != null)
                {
                    response = new ItemResponse<Paged<Event>> { Item = pagedEvents };
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [AllowAnonymous]
        [HttpGet("search/geo")]
        public ActionResult<List<Event>> GeoSearch(double lat, double lng, double radius)
        {
            int code = 200;
            BaseResponse response = null;
            List<Event> list = null; 

            try
            {
                list = _eventService.Search_Geo(lat, lng, radius); 

                if (list != null)
                {
                    response = new ItemResponse<List<Event>> { Item = list }; 
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
        [HttpPut]
        public ActionResult<SuccessResponse> Update(EventsUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                _eventService.Update(model);
                response = new SuccessResponse(); 
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }
            return StatusCode(code, response); 
        }
        [HttpPost("volunteer")]
        public ActionResult<SuccessResponse> AddUserEvent(int userId, int eventId)
        {
            int code = 200;
            BaseResponse response = null; 
            try
            {
                _eventService.UserEventAdd(userId, eventId);
                response = new SuccessResponse(); 
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }
            return StatusCode(code, response); 
        }
        [HttpDelete("unvolunteer")]
        public ActionResult<SuccessResponse> DeleteUserEvent(int userId, int eventId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _eventService.DeleteUserEvent(userId, eventId);
                response = new SuccessResponse();
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
