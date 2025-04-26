import Loki from 'lokijs';
import { v4 as uuidv4 } from 'uuid';
import { Widget } from '../schemas/widget.schema';

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

export { db, widgetsCollection };
