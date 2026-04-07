import {
    DocumentData,
    DocumentSnapshot,
    Firestore,
    OrderByDirection,
    QueryDocumentSnapshot,
    QueryFieldFilterConstraint,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
} from 'firebase/firestore'
import { FieldPath } from 'react-hook-form'

interface ObjectWithId {
    id: string
}
type Collection = string

type GetAll<T> = (orderBy?: string | FieldPath<Record<string, unknown>>, orderDirection?: OrderByDirection) => Promise<T[]>
type GetById<T> = (id: string) => Promise<T | undefined>
type Create<T> = (data: Omit<T, 'id'>) => Promise<T>
type Update<T> = (data: Partial<T> & ObjectWithId) => Promise<void>
type Delete<T extends { id: string }> = (id: T['id']) => Promise<void>
type Query<T> = (filter: QueryFieldFilterConstraint | QueryFieldFilterConstraint[]) => Promise<T[]>

export class FirebaseFactory<T extends ObjectWithId> {
    constructor(private readonly firestore: Firestore, private readonly collectionName: Collection) {
        this.collectionName = collectionName
    }

    private getOneDocWithId = (doc: DocumentSnapshot<DocumentData>) => {
        return {
            ...doc.data(),
            id: doc.id,
        } as T
    }

    private getDocsWithId = (docs: QueryDocumentSnapshot<DocumentData>[]) => {
        return docs.map(
            doc =>
                ({
                    ...doc.data(),
                    id: doc.id,
                } as T),
        )
    }

    getAll: GetAll<T> = async () => {
        const col = collection(this.firestore, this.collectionName)
        const snapshot = await getDocs(col)
        return this.getDocsWithId(snapshot.docs)
    }

    getById: GetById<T> = async id => {
        const col = collection(this.firestore, this.collectionName)
        const ref = doc(col, id)
        if (!ref.id) {
            return
        }
        const docWithData = await getDoc(ref)
        return this.getOneDocWithId(docWithData)
    }

    create: Create<T> = async data => {
        const col = collection(this.firestore, this.collectionName)
        const createdDoc = await addDoc(col, data)
        const docWithData = await getDoc(createdDoc)
        return this.getOneDocWithId(docWithData)
    }

    update: Update<T> = async data => {
        const { id, ...rest } = data
        const ref = doc(this.firestore, this.collectionName, id)
        return updateDoc(ref, rest)
    }

    delete: Delete<T> = async id => {
        const ref = doc(this.firestore, this.collectionName, id)
        return deleteDoc(ref)
    }

    query: Query<T> = async filter => {
        const col = collection(this.firestore, this.collectionName)
        const q = query(col, ...(filter instanceof Array ? filter : [filter]))
        const docs = await getDocs(q)
        return this.getDocsWithId(docs.docs)
    }
}
