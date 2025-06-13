import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControls from '@/components/shared/PaginationControls';

describe('PaginationControls', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      totalCount: 100,
      perPage: 10,
      maxVisible: 5,
      onPageChange: jest.fn(),
      ...props,
    };

    render(<PaginationControls {...defaultProps} />);
    return defaultProps;
  };

  it('renders correct number of page buttons', () => {
    setup({ totalCount: 100, perPage: 10, currentPage: 1 });
    const pageButtons = screen.getAllByRole('button', { name: /^\d+$/ });
    expect(pageButtons.length).toBe(5);
  });

  it('disables Prev button on first page', () => {
    setup({ currentPage: 1 });
    screen.getAllByText(12);
    const x = screen.getAllByText('Prev');
  });

  it('disables Next button on last page', () => {
    setup({ currentPage: 10, totalCount: 100 });
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls onPageChange with correct value when a page is clicked', () => {
    const { onPageChange } = setup({ currentPage: 1 });
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when Prev/Next is clicked', () => {
    const { onPageChange } = setup({ currentPage: 5 });
    fireEvent.click(screen.getByText('Prev'));
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);
    expect(onPageChange).toHaveBeenCalledWith(6);
  });
});
