using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UserAddRequest
    {
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [MinLength(6)]
        [MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            ErrorMessage = "Password must contain at least 8 characters with an uppercase letter, lowercase letter, a number, and a symbol.")]
        [MaxLength(100)]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        [MaxLength(100)]
        public string PasswordConfirm { get; set; }
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Dob { get; set; }
        [Required]
        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string AvatarUrl { get; set; }
    }
}
