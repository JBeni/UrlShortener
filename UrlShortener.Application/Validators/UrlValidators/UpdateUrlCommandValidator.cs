namespace BlazorShop.Application.Validators.InvoiceValidator
{
    public class UpdateUrlCommandValidator : AbstractValidator<UpdateUrlCommand>
    {
        public UpdateUrlCommandValidator()
        {
            RuleFor(v => v.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0");

            RuleFor(v => v.EndpointUrl)
                .MaximumLength(3000).WithMessage("Maximum length exceeded")
                .NotEmpty().WithMessage("EndpointUrl must not be empty")
                .NotNull().WithMessage("EndpointUrl must not be null");
        }
    }
}
