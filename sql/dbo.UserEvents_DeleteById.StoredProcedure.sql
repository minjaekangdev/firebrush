/****** Object:  StoredProcedure [dbo].[UserEvents_DeleteById]    Script Date: 12/2/2022 5:35:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UserEvents_DeleteById]
									@UserId int
									,@EventId int

as

/*

DECLARE @UserId int = 5
		,@EventId int = 7

EXECUTE dbo.UserEvents_DeleteById
								@UserId
								,@EventId



*/

BEGIN

		DELETE FROM [dbo].[UserEvents]
			  WHERE UserId = @UserId
			  AND	EventId = @EventId
END


GO
