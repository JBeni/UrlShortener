namespace BlazorShop.Application.Validators.InvoiceValidator
{
    public class DeleteUrlCommandValidator : AbstractValidator<DeleteUrlCommand>
    {
        public DeleteUrlCommandValidator()
        {
            RuleFor(v => v.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0");
        }
    }
}
