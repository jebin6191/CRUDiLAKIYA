using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudOperation.Models
{
    public class EmployeeModel
    {
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? DesignationId { get; set; }
        public string DesignationName { get; set; }
        public DateTime? DateofBirth { get; set; }
        public double? Salary { get; set; }
        public string Gender { get; set; }
        public string WrkLocationAllowed { get; set; }
        public string Process { get; set; }
    }
}