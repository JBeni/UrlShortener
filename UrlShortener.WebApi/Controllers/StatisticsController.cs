namespace UrlShortener.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ApiControllerBase
    {
        [HttpGet("BrowserStatistics/{urlId}")]
        public async Task<IActionResult> GetBrowserStatistics(int urlId)
        {
            var result = await Mediator.Send(new GetUrlStatisticsPerBrowserQuery { UrlId = urlId });
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpGet("OSStatistics/{urlId}")]
        public async Task<IActionResult> GetOSStatistics(int urlId)
        {
            var result = await Mediator.Send(new GetUrlStatisticsPerOSQuery { UrlId = urlId });
            return result.Successful == true
                ? Ok(result)
                : BadRequest(result);
        }
    }
}
