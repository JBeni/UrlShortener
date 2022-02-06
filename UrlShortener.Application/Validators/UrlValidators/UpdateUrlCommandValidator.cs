namespace BlazorShop.Application.Validators.InvoiceValidator
{
    public class UpdateUrlCommandValidator : AbstractValidator<UpdateUrlCommand>
    {
        public UpdateUrlCommandValidator()
        {
            RuleFor(v => v.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0");

            RuleFor(v => v.OriginalUrl)
                .MaximumLength(3000).WithMessage("Maximum length exceeded")
                .NotEmpty().WithMessage("OriginalUrl must not be empty")
                .NotNull().WithMessage("OriginalUrl must not be null");

            RuleFor(v => v.UrlKey)
                .MaximumLength(200).WithMessage("Maximum length exceeded")
                .NotEmpty().WithMessage("UrlKey must not be empty")
                .NotNull().WithMessage("UrlKey must not be null");
        }
    }
}
