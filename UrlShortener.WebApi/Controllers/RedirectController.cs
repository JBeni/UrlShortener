namespace UrlShortener.WebApi.Controllers
{
    public class RedirectController : ApiControllerBase
    {
        [HttpGet]
        [Route("{urlKey}")]
        public async Task<IActionResult> GetUrlByUrlKeySecond(string urlKey)
        {
            var url = HttpContext.Request;

            var resulasdasdsat = Request.Headers;


//            Lookup in header for info, like platform 9edgen chrome and so on and for the operating system
// windows, linux, get the infos from the headers


            var result = await Mediator.Send(new GetUrlByUrlKeyQuery { UrlKey = urlKey });
            return result.Successful == true
                ? RedirectPermanent(result.Item.OriginalUrl)
                : BadRequest(result);
        }
    }
}
