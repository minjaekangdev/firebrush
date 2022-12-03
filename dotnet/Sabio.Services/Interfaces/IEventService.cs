using Sabio.Models;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace Sabio.Services.Interfaces
{
    public interface IEventService
    {
        Paged<Event> GetAll(int pageIndex, int pageSize);
        Paged<Event> SelectAllUserEvents(int pageIndex, int pageSize, int userId);
        int Create(EventsAddRequest model);
        void Update(EventsUpdateRequest model);
        void UserEventAdd(int userId, int eventId);
        void DeleteUserEvent(int userId, int eventId);
        List<Event> Search_Geo(double latitude, double longitude, double radius);
        Paged<Event> Search(int pageIndex, int pageSize, string query);
    }
}