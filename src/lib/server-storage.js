import fs from 'fs';
import path from 'path';

/**
 * Helper to read and write to local JSON database files
 */
export class ServerStorage {
    static getFilePath(filename) {
        return path.join(process.cwd(), 'src', 'data', filename);
    }

    static read(filename) {
        const filePath = this.getFilePath(filename);
        try {
            if (!fs.existsSync(filePath)) {
                // Return empty array if file doesn't exist
                return [];
            }
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data || '[]');
        } catch (error) {
            console.error(`Error reading ${filename}:`, error);
            return [];
        }
    }

    static write(filename, data) {
        const filePath = this.getFilePath(filename);
        try {
            // Ensure directory exists
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(`Error writing to ${filename}:`, error);
            return false;
        }
    }

    /**
     * Specialized methods for Products
     */
    static getProducts() {
        return this.read('dynamic_products.json');
    }

    static saveProducts(products) {
        return this.write('dynamic_products.json', products);
    }

    /**
     * Specialized methods for Orders
     */
    static getOrders() {
        return this.read('orders.json');
    }

    static saveOrders(orders) {
        return this.write('orders.json', orders);
    }

    /**
     * Specialized methods for Blogs
     */
    static getBlogs() {
        return this.read('blogs.json');
    }

    static saveBlogs(blogs) {
        return this.write('blogs.json', blogs);
    }

    /**
     * Specialized methods for Doctors
     */
    static getDoctors() {
        return this.read('doctors.json');
    }

    static saveDoctors(doctors) {
        return this.write('doctors.json', doctors);
    }

    /**
     * Specialized methods for Diseases
     */
    static getDiseases() {
        return this.read('diseases.json');
    }

    static saveDiseases(diseases) {
        return this.write('diseases.json', diseases);
    }

    /**
     * Specialized methods for Users
     */
    static getUsers() {
        return this.read('users.json');
    }

    static saveUsers(users) {
        return this.write('users.json', users);
    }
}
