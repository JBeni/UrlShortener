namespace UrlShortener.Application.Validators.StatisticsValidators
{
    public class GetUrlStatisticsPerOSQueryValidator : AbstractValidator<GetUrlStatisticsPerOSQuery>
    {
        public GetUrlStatisticsPerOSQueryValidator()
        {
            RuleFor(v => v.UrlId)
                .GreaterThan(0).WithMessage("UrlId must not be empty");
        }
    }
}
