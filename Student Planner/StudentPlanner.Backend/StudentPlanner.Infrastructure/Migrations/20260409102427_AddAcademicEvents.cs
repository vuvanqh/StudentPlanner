using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentPlanner.Infrastructure.Migrations;

/// <inheritdoc />
public partial class AddAcademicEvents : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "AcademicEvents",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                FacultyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                SubscriberIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                EventDetails_Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                EventDetails_StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                EventDetails_EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                EventDetails_Location = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                EventDetails_Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_AcademicEvents", x => x.Id);
                table.ForeignKey(
                    name: "FK_AcademicEvents_Faculties_FacultyId",
                    column: x => x.FacultyId,
                    principalTable: "Faculties",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "AcademicEvents");
    }
}
