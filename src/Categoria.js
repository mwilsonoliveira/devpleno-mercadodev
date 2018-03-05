import React, { Component } from 'react'
import axios from 'axios'

import AnuncioHome from './AnuncioHome'

// https://mercadodev-8ffd0.firebaseio.com/categorias.json

class Categoria extends Component {
	constructor (props) {
		super(props)
		
		this.state = {
				anuncios: {},
				isLoading: false
		}

		this.loadAnuncios = this.loadAnuncios.bind(this)
		
		this.loadAnuncios(this.props.match.params.urlCategoria)
	}
	loadAnuncios(urlCategoria){
		// Carregar dados
		this.setState({ 
			isLoading: true,
			anuncios: {}
		})
		const url = `https://mercadodev-8ffd0.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22`
		axios
			.get(url)
			.then( data => {
				this.setState({ anuncios: data.data, isLoading: false })
				this.categoria = urlCategoria
			})
	}
	componentWillReceiveProps(newProps){
		if(newProps.match.params.urlCategoria){
			if(this.categoria !== newProps.match.params.urlCategoria){
				this.loadAnuncios(newProps.match.params.urlCategoria)
			}
		}
	}
	render () {
		return (
			<div>
				<h1>
					Categoria: &nbsp;
					{this.props.match.params.urlCategoria}
				</h1>
				{
					this.state.isLoading && <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
				}
				{
					!this.state.isLoading && Object.keys(this.state.anuncios).length === 0 &&
					<p>Nenhum anúncio cadastrado</p>
				}
				<div className="row">
					{ Object.keys(this.state.anuncios).map( key => {
						const anuncio = this.state.anuncios[key]
						return <AnuncioHome key={key} id={key} anuncio={anuncio} />
						}
					)}
				</div>
			</div>
		)
	}
}

export default Categoria