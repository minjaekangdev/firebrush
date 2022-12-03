/****** Object:  StoredProcedure [dbo].[UserEvents_Insert]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UserEvents_Insert] 
								@UserId int
								,@EventId int

as 

/*

		DECLARE @UserId int = 5,
				@EventId int = 7

		EXECUTE dbo.UserEvents_Insert
								@UserId
								,@EventId

*/

BEGIN

		INSERT INTO [dbo].[UserEvents]
				   ([UserId]
				   ,[EventId])
			 VALUES
				   (@UserId,
				   @EventId)


END
GO
