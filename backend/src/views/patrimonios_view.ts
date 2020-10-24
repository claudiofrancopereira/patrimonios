import Patrimonio from '../models/Patrimonio';
import imagesView from './images_view';

export default {
    render(patrimonio: Patrimonio) {
        return {
            id: patrimonio.id,
            type: patrimonio.type,
            name: patrimonio.name,
            address: patrimonio.address,
            latitude: patrimonio.latitude,
            longitude: patrimonio.longitude,
            notes: patrimonio.notes,
            images: imagesView.renderMany(patrimonio.images)
        };
    },

    renderMany(patrimonios: Patrimonio[]) {
        return patrimonios.map(patrimonio => this.render(patrimonio));
    }
};