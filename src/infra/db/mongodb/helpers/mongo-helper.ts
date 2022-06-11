import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect(value: string) {
    this.client = await MongoClient.connect(value, {})
  },
  async disconnect() {
    this.client.close()
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
  mapObject<T>(collection: any): T {
    const { _id, ...collectionWithoutId } = collection
    return { ...collectionWithoutId, id: _id }
  },
}
