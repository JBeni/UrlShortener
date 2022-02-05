namespace UrlShortener.WebApi.Controllers
{
    public class UrlsController : ApiControllerBase
    {
        private readonly IUrlService _urlService;

        public UrlsController(IUrlService urlService)
        {
            _urlService = urlService;
        }

        [HttpPost("url")]
        public async Task<IActionResult> CreatePost([FromBody] string url)
        {
            return Ok();
        }

/*
        [HttpPut("post")]
        public async Task<IActionResult> UpdatePost([FromBody] UpdatePostCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        [HttpDelete("post/{id}/{userId}")]
        public async Task<IActionResult> DeletePost(int id, int userId)
        {
            var result = await Mediator.Send(new DeletePostCommand { Id = id });
            return Ok(result);
        }

        [HttpGet("post/{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var result = await Mediator.Send(new GetPostByIdQuery { Id = id });
            return Ok(result);
        }

        [HttpGet("posts/{userId}")]
        public async Task<IActionResult> GetPosts(int userId)
        {
            var result = await Mediator.Send(new GetPostsQuery { });
            return Ok(result);
        }
*/

    }
}
