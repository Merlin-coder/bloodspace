import { render, screen } from '@testing-library/react';
import CustomInput from '../index';

it('should render the value being passed into the prop value', async () => {
    render(<CustomInput value={'Ram'} />);
    const inputVal = screen.getByRole('textbox');
    expect(inputVal).not.toBeInTheDocument();
});
