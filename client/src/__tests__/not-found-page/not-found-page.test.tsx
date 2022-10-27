import { MockNotFoundPage } from '@__mockups__/mockups';
import { render, screen } from '@testing-library/react';

describe('Not Found Page test', () => {
  test('should contain text Page Not Found', () => {
    render(<MockNotFoundPage />);

    const textElement = screen.getByText(/Page Not Found/i);

    expect(textElement).toBeInTheDocument();
  });
});
