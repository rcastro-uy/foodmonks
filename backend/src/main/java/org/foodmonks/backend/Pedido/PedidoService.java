package org.foodmonks.backend.Pedido;

import com.google.gson.JsonObject;
import org.foodmonks.backend.Restaurante.Restaurante;
import org.foodmonks.backend.datatypes.EstadoPedido;
import org.foodmonks.backend.datatypes.MedioPago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PedidoConverter pedidoConverter;

    @Autowired
    public PedidoService(PedidoRepository pedidoRepository, PedidoConverter pedidoConverter){
        this.pedidoRepository = pedidoRepository; this.pedidoConverter = pedidoConverter;
    }

    public List<JsonObject> listaPedidosEfectivoConfirmados(Restaurante restaurante){
        return pedidoConverter.listaJsonPedido(pedidoRepository.findPedidosByRestauranteAndEstadoAndMedioPago(restaurante, EstadoPedido.CONFIRMADO, MedioPago.EFECTIVO));
    }

    public boolean existePedido (Long idPedido){
        return pedidoRepository.existsPedidoById(idPedido);
    }

    public boolean existePedidoRestaurante (Long idPedido, Restaurante restaurante) {
        return pedidoRepository.existsPedidoByIdAndRestaurante(idPedido,restaurante); }

    public void cambiarEstadoPedido(Long idPedido, EstadoPedido estadoPedido){
        Pedido pedido = pedidoRepository.findPedidoById(idPedido);
        pedido.setEstado(estadoPedido);
        pedidoRepository.save(pedido);
    }
}