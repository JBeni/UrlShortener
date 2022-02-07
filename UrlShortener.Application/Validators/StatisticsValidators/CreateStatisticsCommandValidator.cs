namespace UrlShortener.Application.Validators.StatisticsValidators
{
    public class CreateStatisticsCommandValidator : AbstractValidator<CreateStatisticsCommand>
    {
        public CreateStatisticsCommandValidator()
        {
            RuleFor(v => v.UrlId)
                .GreaterThan(0).NotEmpty().WithMessage("UrlId must be greater then 0");

            RuleFor(v => v.BrowserUsed)
                .MaximumLength(200).WithMessage("Maximum length exceeded")
                .NotEmpty().WithMessage("BrowserUsed must not be empty")
                .NotNull().WithMessage("BrowserUsed must not be null");

            RuleFor(v => v.OperatingSystemUsed)
                .MaximumLength(100).WithMessage("Maximum length exceeded")
                .NotEmpty().WithMessage("OperatingSystemUsed must not be empty")
                .NotNull().WithMessage("OperatingSystemUsed must not be null");

            RuleFor(v => v.AccessedAt)
                .GreaterThanOrEqualTo(DateTime.Now.AddDays(-1)).WithMessage("Date must be greater or equal with Current Date")
                .NotEmpty().WithMessage("AccessedAt must not be empty")
                .NotNull().WithMessage("AccessedAt must not be null");
        }
    }
}
