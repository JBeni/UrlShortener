namespace BlazorShop.Application.Validators.InvoiceValidator
{
    public class GetUrlByUrlKeyQueryValidator : AbstractValidator<GetUrlByUrlKeyQuery>
    {
        public GetUrlByUrlKeyQueryValidator()
        {
            RuleFor(v => v.UrlKey)
                .NotEmpty().WithMessage("UrlKey must not be empty")
                .NotNull().WithMessage("UrlKey must not be null");
        }
    }
}
