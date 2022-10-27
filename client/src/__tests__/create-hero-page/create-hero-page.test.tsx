import 'whatwg-fetch';
import React from 'react';

import { MockCreateHeroPage } from '@__mockups__/mockups';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Create Hero Page test', async () => {
  test('nickname should contain only latin characters', async () => {
    render(<MockCreateHeroPage />);

    const nameTextBox = screen.getByRole('textbox', {
      name: /nickname/i,
    });
    const user = userEvent;
    await user.clear(nameTextBox);
    await user.type(nameTextBox, 'a1');
    const submitButton = screen.getByRole('submit-button');
    user.click(submitButton);
    const errorEl = await screen.findByText(
      'Nickname must contain only latin characters',
    );

    expect(errorEl).toBeInTheDocument();
  });
  test('text field should be at least 2 characters', async () => {
    render(<MockCreateHeroPage />);

    const textBoxes = screen.getAllByRole('textbox');
    const user = userEvent;
    for (const textBox of textBoxes) {
      await user.clear(textBox);
      await user.type(textBox, 'a');
    }

    const submitButton = screen.getByRole('submit-button');
    user.click(submitButton);
    const errorEl = await screen.findAllByText(
      /must be at least 2 characters/i,
    );

    expect(errorEl.length).toEqual(5);
  });
  test('text field should not exceed 150 characters', async () => {
    render(<MockCreateHeroPage />);

    const textBoxes = screen.getAllByRole('textbox');
    const user = userEvent;
    for (const textBox of textBoxes) {
      await user.clear(textBox);
      await user.type(
        textBox,
        'qweasdasdjhewrjhsdjkfhsfnhmcsadkjfhoaisfxmhodsaasdasjkdhasjkdghasjdgasjhdgajhdgqhdebqjhwebajkdhjaksdhkjadhakjsdhqwehqwekjdadhkjhasdkjahsdoiuqhedadnlkaa',
      );
    }

    const submitButton = screen.getByRole('submit-button');
    user.click(submitButton);
    const errorEl = await screen.findAllByText(
      /must not exceed 150 characters/i,
    );

    expect(errorEl.length).toEqual(5);
  });
});
