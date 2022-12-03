using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Events
{
    public class EventsAddRequest
    {
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Headline { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(128)]
        public string Summary { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string Slug { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(255)]
        public string ImageUrl { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }
        [Required]
        [Range(-90, 90)]
        public double Latitude { get; set; }
        [Required]
        [Range(-180, 180)]
        public double Longitude { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string BuildingNumber { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(128)]
        public string Street { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(128)]
        public string City { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string State { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string ZipCode { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateStart { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateEnd { get; set; }
    }
}
