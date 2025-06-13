import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from '@/src/components/shared/DarkModeToggle';

describe('DarkModeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('enables dark mode on click if initially light', () => {
    render(<DarkModeToggle />);
    const button = screen.getByRole('button', { name: /toggle dark mode/i });

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('disables dark mode on second click', () => {
    render(<DarkModeToggle />);
    const button = screen.getByRole('button', { name: /toggle dark mode/i });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
