﻿using Sabio.Models.Domain.MetaData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Events
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public string Slug { get; set; }
        public string ImageUrl { get; set; }
        public int CreatedBy { get; set; }
        public List<MetaDatum> MetaData { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
