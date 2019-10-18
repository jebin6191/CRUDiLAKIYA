using CrudOperation.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CrudOperation.api
{
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiController
    {
        EmployeeModel objEmployeeModel = new EmployeeModel();
        private SqlConnection _connection;
        private string _connectionString;

        private string ConnectionString
        {
            get
            {
                if (string.IsNullOrEmpty(_connectionString) || _connectionString == "")
                {
                    _connectionString = Convert.ToString(System.Configuration.ConfigurationManager.AppSettings["Crystal_Conn"]);

                    return _connectionString;
                }
                else
                    return _connectionString;
            }
            set { _connectionString = value; }
        }

        private SqlConnection DBConnection
        {
            get
            {
                if (_connection == null)
                    _connection = new SqlConnection(ConnectionString);
                return _connection;
            }
            set { _connection = value; }
        }

        public void OpenConnection(SqlCommand command)
        {
            command.Connection = this.DBConnection;
            if (this.DBConnection.State != ConnectionState.Open)
                DBConnection.Open();
        }

        public void CloseConnection()
        {
            if (DBConnection.State != ConnectionState.Closed)
                DBConnection.Close();
        }

        protected DataTable GetDataTable(SqlCommand command)
        {
            DataSet oDataset = new DataSet(); ;
            try
            {
                this.OpenConnection(command);
                using (SqlDataAdapter oAdapter = new SqlDataAdapter(command))
                {
                    oAdapter.Fill(oDataset);
                    return oDataset.Tables[0];
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(ex.Message);
                throw new ApplicationException("ExecuteDataSet Failed ", ex);
            }
            finally
            {
                this.CloseConnection();
            }
        }

        public EmployeeController()
        {
            // create instance of an object
            objEmployeeModel = new EmployeeModel();
        }



        [HttpPost]
        [Route("ReadDepartment")]
        public HttpResponseMessage ReadDepartment([FromBody] EmployeeModel obj)
        {
            try
            {
                if (this.DBConnection.State != ConnectionState.Open)
                    DBConnection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.CommandText = "Select DepartmentId,DepartmentName from Department";
                    command.CommandType = CommandType.Text;
                    var result = GetDataTable(command);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("ReadDesignation")]
        public HttpResponseMessage ReadDesignation([FromBody] EmployeeModel obj)
        {
            try
            {
                if (this.DBConnection.State != ConnectionState.Open)
                    DBConnection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.CommandText = "Select DesignationId,DesignationName from Designation Where DepartmentId = " + obj.DepartmentId.ToString();
                    command.CommandType = CommandType.Text;
                    var result = GetDataTable(command);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        [Route("ReadAllEmployee")]
        public HttpResponseMessage ReadAllEmployee([FromBody] EmployeeModel obj)
        {
            try
            {
                if (this.DBConnection.State != ConnectionState.Open)
                    DBConnection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.CommandText = "Select E.EmployeeId,E.EmployeeName,E.DepartmentId,D.DepartmentName,E.DesignationId,DS.DesignationName,E.DateofBirth,E.Gender,E.Salary ,E.WrkLocationAllowed  from EmployeeDetails E  Inner Join Department D on D.DepartmentId = E.DepartmentId  Inner Join Designation DS on DS.DesignationId = E.DesignationId";

                    command.CommandType = CommandType.Text;
                    var result = GetDataTable(command);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        [Route("SaveEmployee")]
        public HttpResponseMessage SaveEmployee([FromBody] EmployeeModel obj)
        {
            try
            {
                if (this.DBConnection.State != ConnectionState.Open)
                    DBConnection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.CommandText = "Insert into EmployeeDetails(EmployeeName,DepartmentId,DesignationId,DateofBirth,Gender,Salary ,WrkLocationAllowed ) Values('" + obj.EmployeeName + "'," + obj.DepartmentId.ToString() + "," + obj.DesignationId.ToString() + ",'" + Convert.ToDateTime(obj.DateofBirth).ToString("dd-MMM-yyyy") + "','" + obj.Gender + "'," + obj.Salary.ToString() + ",'" + obj.WrkLocationAllowed + "')";
                    command.CommandType = CommandType.Text;
                    OpenConnection(command);
                    //command.ExecuteNonQuery();
                    return Request.CreateResponse(HttpStatusCode.OK, command.ExecuteNonQuery());
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut]
        [Route("UpdateEmployee")]
        public HttpResponseMessage UpdateEmployee([FromBody] EmployeeModel obj)
        {
            try
            {
                if (this.DBConnection.State != ConnectionState.Open)
                    DBConnection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.CommandText = "Update EmployeeDetails Set EmployeeName = '" + obj.EmployeeName + "', DepartmentId = " + obj.DepartmentId.ToString() + ",DesignationId = " + obj.DesignationId.ToString() + ",DateofBirth = '" + Convert.ToDateTime(obj.DateofBirth).ToString("dd-MMM-yyyy") + "',Gender = '" + obj.Gender + "', Salary = " + obj.Salary.ToString() + ",WrkLocationAllowed = '" + obj.WrkLocationAllowed + "' Where EmployeeId = " + obj.EmployeeId.ToString();
                    command.CommandType = CommandType.Text;
                    OpenConnection(command);
                    //command.ExecuteNonQuery();
                    return Request.CreateResponse(HttpStatusCode.OK, command.ExecuteNonQuery());
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        [HttpPost]
        [Route("DeleteEmployee")]
        public HttpResponseMessage DeleteEmployee([FromBody] EmployeeModel obj)
        {
            try
            {
                if (this.DBConnection.State != ConnectionState.Open)
                    DBConnection.Open();

                using (SqlCommand command = new SqlCommand())
                {
                    command.CommandText = "delete From EmployeeDetails Where EmployeeId = " + obj.EmployeeId.ToString();
                    command.CommandType = CommandType.Text;
                    OpenConnection(command);
                    //command.ExecuteNonQuery();
                    return Request.CreateResponse(HttpStatusCode.OK, command.ExecuteNonQuery());
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}