/****** Object:  StoredProcedure [dbo].[Events_Insert]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Events_Insert]
							@Name nvarchar(50)
							,@Headline nvarchar(50)
							,@Description nvarchar(128)
							,@Summary nvarchar(128) 
							,@Slug nvarchar(50) 
							,@ImageUrl nvarchar(255)
							,@DateStart datetime2 
							,@DateEnd datetime2
							,@Latitude float
							,@Longitude float
							,@BuildingNumber nvarchar(50) 
							,@Street nvarchar(128)
							,@City nvarchar(128)
							,@State nvarchar(50) 
							,@ZipCode nvarchar(50)
							,@CreatedBy int
							,@Id int OUTPUT
							

as

/*
			Select * 
			From dbo.Events
			Select *
			From dbo.Locations
			Select *
			From dbo.MetaData
			DECLARE 		@Name nvarchar(50) = 'Event#1'
							,@Headline nvarchar(50) = 'Event#1Headline'
							,@Description nvarchar(128) = 'Event#1Description'
							,@Summary nvarchar(128) = 'Event#1Summary'
							,@Slug nvarchar(50) = 'Event#1Slug'
							,@ImageUrl nvarchar(255) = 'https://gooogle.com'
							,@dateStart datetime2 = GETUTCDATE() 
							,@dateEnd datetime2 = GETUTCDATE() 
							,@latitude float = 34.0648099
							,@longitude float = -118.2940402
							,@BuildingNumber nvarchar(50) = '520'
							,@Street nvarchar(128) = 'S Berendo St'
							,@City nvarchar(128) = 'Los Angeles'
							,@State nvarchar(50) = 'CA' 
							,@ZipCode nvarchar(50) = '90020'
							,@CreatedBy int = 5
							,@Id int 

			EXECUTE dbo.Events_Insert @Name
									,@Headline
									,@Description
									,@Summary
									,@Slug
									,@ImageUrl
									,@dateStart
									,@dateEnd
									,@latitude
									,@longitude
									,@BuildingNumber
									,@Street
									,@City 
									,@State
									,@ZipCode 
									,@CreatedBy
									,@Id OUTPUT

			Select * 
			From dbo.Events
			Select *
			From dbo.Locations
			Select *
			From dbo.MetaData
			SELECT *
			from dbo.UserEvents
*/

BEGIN
			DECLARE @LocationId int
			INSERT INTO dbo.Locations
						(Latitude
						,Longitude
						,BuildingNumber
						,Street
						,City
						,State
						,ZipCode) 
				VALUES 
						(@Latitude
						,@Longitude
						,@BuildingNumber
						,@Street 
						,@City
						,@State 
						,@ZipCode)

			SET @LocationId = SCOPE_IDENTITY() 

			DECLARE @MetaDataId int
			INSERT INTO dbo.MetaData
						(LocationId
						,DateStart
						,DateEnd)
				VALUES 
						(@LocationId
						,@DateStart
						,@DateEnd)

			SET @MetaDataId = SCOPE_IDENTITY()


			INSERT INTO [dbo].[Events]
					   ([Name]
					   ,[Headline]
					   ,[Description]
					   ,[Summary]
					   ,[Slug]
					   ,[ImageUrl]
					   ,[MetaDataId]
					   ,[CreatedBy]
					   )
				 VALUES
					   (@Name
					   ,@Headline
					   ,@Description
					   ,@Summary
					   ,@Slug
					   ,@ImageUrl
					   ,@MetaDataId
					   ,@CreatedBy
						)
			SET @Id = SCOPE_IDENTITY() 

END
GO
