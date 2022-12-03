/****** Object:  StoredProcedure [dbo].[Users_SelectById]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_SelectById]
								@Id int

as

/*

		DECLARE @Id int = 2

		EXECUTE dbo.Users_SelectById 
									@Id


*/

BEGIN

		SELECT [Id]
			  ,[FirstName]
			  ,[LastName]
			  ,[Email]
			  ,[Dob]
			  ,[AvatarUrl]
			  ,[DateCreated]
			  ,[DateModified]
		  FROM [dbo].[Users]
		WHERE [Id] = @Id

END


GO
