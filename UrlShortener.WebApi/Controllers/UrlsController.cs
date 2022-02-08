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
            var result = await Mediator.Send(command);
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpPut("url")]
        public async Task<IActionResult> UpdateUrl([FromBody] UpdateUrlCommand command)
        {
            command.EndpointUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/";
            var result = await Mediator.Send(command);
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpDelete("url/{id}")]
        public async Task<IActionResult> DeleteUrl(int id)
        {
            var result = await Mediator.Send(new DeleteUrlCommand { Id = id });
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

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
