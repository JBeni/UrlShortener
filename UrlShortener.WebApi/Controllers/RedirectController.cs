namespace UrlShortener.WebApi.Controllers
{
    public class RedirectController : ApiControllerBase
    {
        [HttpGet]
        [Route("{urlKey}")]
        public async Task<IActionResult> GetUrlByUrlKeySecond(string urlKey)
        {
            var result = await Mediator.Send(new GetUrlByUrlKeyQuery { UrlKey = urlKey });

            if (!result.Successful) return BadRequest(result);
            var command = new CreateStatisticsCommand
            {
                UrlId = result.Item.Id,
                UserAgentHeader = Request.Headers["sec-ch-ua"].FirstOrDefault() != null
                    ? Request.Headers["sec-ch-ua"].FirstOrDefault()
                    : Request.Headers["User-Agent"].FirstOrDefault(),
                AccessedAt = DateTime.Now
            };
            await Mediator.Send(command);

            return RedirectPermanent(result.Item.OriginalUrl);
        }
    }
}
