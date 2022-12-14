/****** Object:  StoredProcedure [dbo].[Users_Insert]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[Users_Insert]
							@FirstName nvarchar(100)
							,@LastName nvarchar(100)
							,@Email nvarchar(255)
							,@Password varchar(100)
							,@Dob date
							,@AvatarUrl varchar(255)
							,@Id int OUTPUT
							

AS 

/*

			SELECT *
			FROM dbo.Users

			DECLARE			@FirstName nvarchar(100) = 'Test'
							,@LastName nvarchar(100) = 'Kang'
							,@Email nvarchar(255) = 'test@email.com'
							,@Password varchar(100) = 'Password1!'
							,@Dob date = '2022-01-01'
							,@AvatarUrl varchar(255) = 'https://google.com'
							,@Id int 

			EXECUTE dbo.Users_Insert @FirstName
									,@LastName
									,@Email
									,@Password
									,@Dob
									,@AvatarUrl
									,@Id

			SELECT *
			FROM dbo.Users


*/

BEGIN

INSERT INTO [dbo].[Users]
           ([FirstName]
           ,[LastName]
           ,[Email]
           ,[Password]
           ,[Dob]
           ,[AvatarUrl])
     VALUES
           (@FirstName
		   ,@LastName
		   ,@Email
		   ,@Password
		   ,@Dob
		   ,@AvatarUrl)

	SET	@Id = SCOPE_IDENTITY();

	INSERT INTO dbo.UserRoles
				(UserId
				,RoleId)
			VALUES (@Id
					,1)
		  
END


GO
