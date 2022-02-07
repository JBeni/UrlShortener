namespace UrlShortener.Application.Validators.StatisticsValidators
{
    public class GetUrlStatisticsPerBrowserQueryValidator : AbstractValidator<GetUrlStatisticsPerBrowserQuery>
    {
        public GetUrlStatisticsPerBrowserQueryValidator()
        {
            RuleFor(v => v.UrlId)
                .GreaterThan(0).WithMessage("UrlId must not be empty");
        }
    }
}
