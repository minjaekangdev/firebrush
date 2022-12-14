/****** Object:  StoredProcedure [dbo].[Events_SelectAll]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Events_SelectAll] 
								@PageIndex int 
								,@PageSize int

as 

/*
DECLARE @PageIndex int = 0
		,@PageSize int = 10
EXECUTE dbo.Events_SelectAll @PageIndex
							,@PageSize
*/

BEGIN
			DECLARE @offset int = @PageIndex * @PageSize


			SELECT e.[Id]
				  ,e.[Name]
				  ,e.[Headline]
				  ,e.[Description]
				  ,e.[Summary]
				  ,e.[Slug]
				  ,e.[ImageUrl]
				  ,e.CreatedBy
				  ,MetaData = (Select	m.Id
										,m.dateStart
										,m.dateEnd
										,Location = (Select	l.Id
															,l.Latitude
															,l.Longitude
															,l.BuildingNumber
															,l.Street
															,l.City
															,l.State
															,l.ZipCode
														From	dbo.Locations as l
														WHERE l.Id = m.LocationId
														FOR JSON AUTO
										)
								From	dbo.MetaData as m
								WHERE	m.Id = e.MetaDataId
								FOR JSON AUTO
				  )
				  ,e.[DateCreated]
				  ,e.[DateModified]
				  ,[TotalCount] = COUNT(1) OVER() 

			  FROM [dbo].[Events] as e inner join dbo.MetaData as md
						on e.MetaDataId = md.Id
						inner join dbo.Locations as l 
							on md.locationId = l.Id
			  ORDER BY Id

			  OFFSET @offset ROWS
			  FETCH NEXT @PageSize ROWS ONLY

END
GO
