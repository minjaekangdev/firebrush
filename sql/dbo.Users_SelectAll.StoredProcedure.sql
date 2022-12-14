/****** Object:  StoredProcedure [dbo].[Users_SelectAll]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_SelectAll]
								@PageIndex int
								,@PageSize int

as


/*

		DECLARE
				@PageIndex int = 0
				,@PageSize int = 3
		EXECUTE 
				dbo.Users_SelectAll
									@PageIndex
									,@PageSize


*/

BEGIN

		DECLARE @offset int = @PageIndex * @PageSize

		SELECT [Id]
			  ,[FirstName]
			  ,[LastName]
			  ,[Email]
			  ,[Dob]
			  ,[AvatarUrl] 
			  ,[DateCreated]
			  ,[DateModified]
			  ,TotalCount = Count(1) OVER()
		  FROM [dbo].[Users]

		  ORDER BY [Id]

		  OFFSET @offset ROWS 
		  FETCH NEXT @PageSize ROWS ONLY
END


GO
