/****** Object:  StoredProcedure [dbo].[Events_Search_Geo]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Events_Search_Geo]
									@lat float
									,@lng float
									,@radius float
/*
DECLARE @lat float = 34.063517
		,@lng float = -118.294283
		,@radius float = 10
EXECUTE dbo.Events_Search_Geo	@lat
								,@lng
								,@radius
*/

as

BEGIN

SELECT	e.[Id]
		,e.[Name]
		,e.[Headline]
		,e.[Description]
		,e.[Summary]
		,e.[Slug]
		,e.[ImageUrl]
		,e.CreatedBy
		,MetaData = (Select	m.dateStart
							,m.dateEnd
							,Location = (Select	l.Latitude
												,l.Longitude
												,l.BuildingNumber
												,l.Street
												,l.City
												,l.State
												,l.ZipCode
											From	dbo.Locations as l
											WHERE l.Id = m.locationId
											FOR JSON AUTO
							)
					From	dbo.MetaData as m
					WHERE	m.Id = e.MetaDataId
					FOR JSON AUTO
		)
		,e.[DateCreated]
		,e.[DateModified]
		,l.distance
FROM
    (SELECT 
         Id, latitude, longitude,
         ( 3959 * acos( cos( radians(@lat) ) 
						* cos( radians( latitude ) ) 
						* cos( radians( longitude ) - radians(@lng) )  
						+ sin( radians(@lat) ) * sin(radians(latitude)))) AS distance 
     FROM dbo.Locations) l inner join dbo.MetaData as md on l.Id = md.locationId
							inner join dbo.Events as e on e.MetaDataId = md.Id

WHERE 
    l.distance < @radius
ORDER BY 
    l.distance

END
GO
