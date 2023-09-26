import HomePage from '@/app/page';
import { render, screen } from '@testing-library/react';
import 'isomorphic-fetch';
import { Suspense } from 'react';

describe('Home', () => {
  it('renders a heading', async () => {
    // render(await (async () => await HomePage())());
    // const el = screen.getByText('halo');
    // expect(el).toBeInTheDocument(); // ASSE
  });
});
