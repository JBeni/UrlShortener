namespace BlazorShop.Application.Validators.InvoiceValidator
{
    public class GetUrlByIdQueryValidator : AbstractValidator<GetUrlByIdQuery>
    {
        public GetUrlByIdQueryValidator()
        {
            RuleFor(v => v.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0");
        }
    }
}
