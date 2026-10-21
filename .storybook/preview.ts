import type { Preview } from '@storybook/react-vite';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import '../src/assets/css/global.scss';
import '../src/i18n';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
};

export default preview;
