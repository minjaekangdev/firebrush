/****** Object:  StoredProcedure [dbo].[Users_Select_AuthData]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_Select_AuthData]
								@Email nvarchar(255)

as


/*

		DECLARE @Email nvarchar(255) = 'test@email.com'

		EXECUTE dbo.Users_Select_AuthData
									@Email

*/

BEGIN

		SELECT u.[Id]
			  ,u.[Email]
			  ,u.[Password]
			  ,Roles = (SELECT r.[Name]
						FROM dbo.Roles as r inner join dbo.UserRoles as ur 
								on r.Id = ur.RoleId
						WHERE ur.UserId = u.Id
						FOR JSON AUTO)
		  FROM [dbo].[Users] as u
		  WHERE u.Email = @Email

END
GO
