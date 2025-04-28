import Loki from 'lokijs';
import { v4 as uuidv4 } from 'uuid';
import { Widget } from '../schemas/widget.schema';
import { Doodat } from '../schemas/doodat.schema';

// Initialize the database
const db = new Loki('operandio.db');

// Create a collection for widgets
const widgetsCollection = db.addCollection<Widget>('widgets', {
  indices: ['id'],
  unique: ['id'],
});

// Add some sample data
const sampleWidgets: Widget[] = [
  {
    id: uuidv4(),
    name: 'Basic Widget',
    description: 'A simple widget for everyday use',
    image: 'https://medium.com/@tahavoncelik/flutter-widgets-and-basic-widget-types-eba583033d5a',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Premium Widget',
    description: 'A high-end widget with advanced features',
    image:
      'https://www.fishfacecycles.com/product/components/handlebar-tape/widget-premium-silicone-wrap-handlebar-tape-fluo-yellow/',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

sampleWidgets.forEach((widget) => widgetsCollection.insert(widget));

const sampleDoodats: Doodat[] = [
  {
    id: uuidv4(),
    name: 'Basic Doodat',
    description: 'A simple widget for everyday use',
    image: 'https://medium.com/@tahavoncelik/flutter-widgets-and-basic-widget-types-eba583033d5a',
    price: { value: 10, currency: 'NZD' },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Premium Widget',
    description: 'A high-end widget with advanced features',
    image:
      'https://www.fishfacecycles.com/product/components/handlebar-tape/widget-premium-silicone-wrap-handlebar-tape-fluo-yellow/',
    price: { value: 100, currency: 'NZD' },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const doodatsCollection = db.addCollection<Doodat>('doodats', {
  indices: ['id'],
  unique: ['id'],
});

sampleDoodats.forEach((doodat) => doodatsCollection.insert(doodat));

export { db, widgetsCollection, doodatsCollection };
