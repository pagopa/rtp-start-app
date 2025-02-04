import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormSection } from '../FormSection';

describe('FormSection', () => {
  it('should render the title and icon correctly', () => {
    const title = 'Test Title';
    const icon = <span data-testid="test-icon">Icon</span>;

    render(
      <FormSection title={title} icon={icon}>
        <div>Child Content</div>
      </FormSection>,
    );

    // Verify that the title and icon are rendered
    const renderedTitle = screen.getByText(title);
    const renderedIcon = screen.getByTestId('test-icon');

    expect(renderedTitle).toBeInTheDocument();
    expect(renderedIcon).toBeInTheDocument();
  });

  it('should render the children correctly', () => {
    const children = <div data-testid="test-children">Child Content</div>;

    render(
      <FormSection title="Test Title" icon={<span>Icon</span>}>
        {children}
      </FormSection>,
    );

    // Verify that the children are rendered
    const renderedChildren = screen.getByTestId('test-children');
    expect(renderedChildren).toBeInTheDocument();
  });

  it('should render the title with the correct typography variant', () => {
    const title = 'Test Title';

    render(
      <FormSection title={title} icon={<span>Icon</span>}>
        <div>Child Content</div>
      </FormSection>,
    );

    // Verify that the title uses the correct typography variant
    const renderedTitle = screen.getByText(title);
    expect(renderedTitle).toHaveClass('MuiTypography-sidenav'); // Assuming 'sidenav' is a custom variant
  });
});
