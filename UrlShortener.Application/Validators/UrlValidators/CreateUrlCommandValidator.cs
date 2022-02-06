namespace UrlShortener.Application.Validators.UrlValidators
{
    public class CreateUrlCommandValidator : AbstractValidator<CreateUrlCommand>
    {
        public CreateUrlCommandValidator()
        {
            RuleFor(v => v.OriginalUrl)
                .MaximumLength(3000).WithMessage("Maximum length exceeded")
                .NotEmpty().WithMessage("OriginalUrl must not be empty")
                .NotNull().WithMessage("OriginalUrl must not be null");

            RuleFor(v => v.EndpointUrl)
                .NotEmpty().WithMessage("EndpointUrl must not be empty")
                .NotNull().WithMessage("EndpointUrl must not be null");
        }
    }
}
