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
            await Mediator.Send(new CreateStatisticsCommand
            {
                UrlId = result.Item.Id,
                BrowserUsed = Request.Headers["sec-ch-ua"].FirstOrDefault(),
                OperatingSystemUsed = Request.Headers["sec-ch-ua-platform"].FirstOrDefault(),
                AccessedAt = DateTime.Now
            });

            return RedirectPermanent(result.Item.OriginalUrl);
        }
    }
}
