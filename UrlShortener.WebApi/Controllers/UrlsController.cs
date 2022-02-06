namespace UrlShortener.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlsController : ApiControllerBase
    {
        [HttpPost("url")]
        public async Task<IActionResult> CreateUrl([FromBody] CreateUrlCommand command)
        {
            command.EndpointUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/";

            command.EndpointUrl = null;

            var result = await Mediator.Send(command);
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpPut("url")]
        public async Task<IActionResult> UpdateUrl([FromBody] UpdateUrlCommand command)
        {
            var result = await Mediator.Send(command);
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpDelete("url/{id}")]
        public async Task<IActionResult> DeleteUrl(int id, int userId)
        {
            var result = await Mediator.Send(new DeleteUrlCommand { Id = id });
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpGet("url/{id}")]
        public async Task<IActionResult> GetUrl(int id)
        {
            var result = await Mediator.Send(new GetUrlByIdQuery { Id = id });
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        //[HttpGet]
        //[Route("{key}")]
        //public async Task<IActionResult> GetUrlByUrlKey(string urlKey)
        //{
        //    var result = await Mediator.Send(new GetUrlByUrlKeyQuery { UrlKey = urlKey });
        //    return result.Successful == true
        //        ? RedirectPermanent(result.Item.OriginalUrl)
        //        : BadRequest(result);
        //}

        [HttpGet("urls")]
        public async Task<IActionResult> GetUrls()
        {
            var result = await Mediator.Send(new GetUrlsQuery { });
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }
    }
}
