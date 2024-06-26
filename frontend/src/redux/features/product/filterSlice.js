import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	filteredProducts: [],
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		FILTER_PRODUCTS(state, action) {
			const { products, search } = action.payload
			const tempProducts = products.filter(product => {
				const name = product.name ? product.name.toLowerCase() : ''
				const category = product.category ? product.category.toLowerCase() : ''
				return name.includes(search.toLowerCase()) || category.includes(search.toLowerCase())
			})

			state.filteredProducts = tempProducts
		},
	},
})

export const { FILTER_PRODUCTS } = filterSlice.actions

export const selectFilteredProducts = state => state.filter.filteredProducts

export default filterSlice.reducer
