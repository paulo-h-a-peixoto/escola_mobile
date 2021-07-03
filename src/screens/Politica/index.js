import React, {useState, useEffect} from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Header,
    Body,
    Text,
    TextBold,
    TextBr,
    TextRed,
    BackButton,
    Scroller
} from './styled';

export default () => {
    const navigation = useNavigation();
    const handleBackButton = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <Scroller>
            {/* <Header>
                <Image source={require('../../assets/val-p.png')} style={{width: 300, height:120}} />
            </Header> */}
            <Body>
            <TextBold>POLÍTICA DE PRIVACIDADE</TextBold>
            <TextBr></TextBr>
            <TextBr></TextBr>
            <Text>Respeitamos a privacidade de todos que utilizam o aplicativo Sétima onda – Educação e Tecnologia.
            Assim, gostaríamos de informá-los sobre a forma como coletamos, usamos, armazenamos,
            compartilhamos e protegemos seus dados pessoais. Recomendamos a leitura desta Política de
            Privacidade para que você possa compreender nossa abordagem em relação ao uso de seus
            dados pessoais.</Text>
            <TextBr></TextBr>
            <Text>Você aceita essa Política de Privacidade ao se cadastrar gratuitamente como usuário do
            Aplicativo e/ou por meio da utilização do Aplicativo ou dos serviços disponibilizados no
            Aplicativo. Ao enviar seus dados pessoais, consideremos que você nos autorizou, sempre que
            necessário e apropriado, a compartilhá-los nos termos previstos nesta política.
            </Text>
            <TextBr></TextBr>
            <TextBold>1) Qual é o objetivo desta Política de Privacidade?</TextBold>
            <TextBr></TextBr>
            <Text>Esta Política de Privacidade destina-se a informá-lo sobre o uso de informações pessoais
            coletadas durante o uso de nosso Aplicativo. São Consideradas informações pessoais: nome data
            de nascimento, endereço físico e eletrônico, número de documentos pessoais, telefone e
            geolocalização (‘’Informações Pessoais”).</Text>
            <TextBr></TextBr>
            <TextBold>2) Uso de aplicativo.</TextBold>
            <TextBr></TextBr>
            <Text>Nosso Aplicativo é destinado a todas as idades.</Text>
            <TextBr></TextBr>
            <TextBold>3) Finalidade da coleta e uso de dados</TextBold>
            <TextBr></TextBr>
            <Text>3.1. Coletamos e utilizamos as Informações Pessoais para melhor fornecer informações sobre
            produtos e/ ou serviços desejados. Portanto, usamos seus dados para:
            - Responder a consultas ou solicitações enviadas por você;
            - Processar o envio de seus cadastros para participação em promoções comerciais;
            - Administrar ou, de outra forma, cumprir as obrigações decorrentes de qualquer acordo
            celebrado entre nós;
            - Prever e resolver problemas referentes a quaisquer bens ou serviços fornecidos;
            - Criar e oferecer produtos ou serviços que possam atender as suas necessidades;
            - Enviar comunicados diversos e material publicitário, adesão automática a companhas
            promocionais e a programas de relacionamento, fidelização e benefícios, ofertas de produtos
            selecionados e serviços personalizados por quaisquer meios, inclusive telefônico, e-mail, SMS,
            pop Ups e correspondência física.</Text>
            <TextBr></TextBr>
            <Text>3.2. Podemos também coletar automaticamente outras informações, como o nome de domínio
            de seu provedor de acesso a internet, o endereço do protocolo de internet (IP) utilizado para
            conectar o dispositivo do Usuário a internet, o sistema operacional e plataforma, o tempo médio
            gasto no Aplicativo, as telas e páginas visitadas, as informações procuradas, os horários de
            acesso e outras estatísticas relevantes. Empregamos todas essas informações para mensurar o
            uso de Aplicativo, bem como para administrá-lo e aperfeiçoá-lo, tornando-o cada vez mais
            funcional ao Usuário. Eventualmente, poderemos fornecer esses dados de forma agregada ou
            não a terceiros para uso em conexão com nosso Aplicativo.
            </Text>
            <TextBr></TextBr>
            <Text>3.3. Adicionalmente, os dados pessoais coletados poderão ser transferidos para nossas
            empresas afiliadas e parceiras comerciais credenciadas, assim como para terceiros contratados,
            como parte dos serviços oferecidos ao usuário através do Aplicativo. Esses terceiros não usarão
            suas informações pessoais para fins que não sejam aqueles que tivermos acordados com eles</Text>
            <TextBr></TextBr>
            <Text>3.4. Respeitamos as suas informações pessoais e, por isso, tomaremos providências para
            garantir seu direito a privacidade.</Text>
            <TextBr></TextBr>
            <Text>3.5. Com exceção dos termos definidos na presente Política de Privacidade, não divulgaremos
            quaisquer informações de identificação pessoal sem a sua permissão, a menos que estejamos
            legalmente autorizados ou obrigados a fazê-lo (por exemplo, se obrigados a fazê-lo com base
            em ações judiciais ou para efeitos de prevenção de fraudes ou outros crimes) ou se acreditarmos
            que tal medida seja necessária para proteger e/ ou defender os nossos direitos, propriedade ou
            segurança pessoal e os de nosso usuários/clientes ou outros indivíduos.
            </Text>
            <TextBr></TextBr>
            <Text>3.6. Além disso, se a qualquer momento você desejar impedir o uso de suas informações em
            qualquer ou todas as finalidades previstas no item 3.1 acima, fale conosco através dos canais de
            contato informados neste Aplicativo. Não usaremos mais as suas informações para tais fins,
            assim que for razoavelmente possível fazê-lo.</Text>
            <TextBr></TextBr>
            <Text>3.7. Nosso objetivo é manter as informações mais precisas possíveis. Portanto, se você quiser
            rever, alterar ou excluir os dados fornecidos a qualquer tempo, fale conosco através do e-mail
            velostertecnologia@gmail.com ou pelo telefone (61) 3627-8953.</Text>
            <TextBr></TextBr>
            <Text>3.8. Cumpre-nos ressalvar, entretanto, que a revisão alteração ou exclusão de seus dados
            poderão inviabilizar a utilização do nosso aplicativo. Assim, nos casos de exclusão de seus dados,
            recomendamos que você não utilize nosso Aplicativo e o desinstale de seu dispositivo.</Text>
            <TextBr></TextBr>
            <TextBold>4) Segurança de Dados Pessoais :</TextBold>
            <TextBr></TextBr>
            <Text>4.1. Como valorizamos suas informações Pessoais, garantimos um nível de proteção adequado.
            Assim, implementamos tecnologias e políticas com objetivo de proteger a sua privacidade
            contra o acesso não autorizado e o uso indevido. Atualizaremos adequadamente estas medidas
            sempre que uma nova tecnologia estiver disponível. </Text>
            <TextBr></TextBr>
            <Text>4.2. Em nosso Aplicativo podemos ter links para Websites diversos, de modo que não podemos
            nos responsabilizar pelas respectivas políticas de privacidade e práticas adotadas. Esse conteúdo
            estará sujeito aos termos de uso, orientações adicionais e informações de privacidade em
            relação ao uso desses sites. Recomendamos que você os leia previamente.</Text>
            <TextBr></TextBr>
            <TextBold>5) Alterações em nossa Política de Privacidade:</TextBold>
            <TextBr></TextBr>
            <Text>Eventualmente poderemos fazer alterações nesta Política de Privacidade. Se fizermos qualquer
            alteração substancial nesta Política e á maneira como utilizamos seus dados pessoais,
            publicaremos essas alterações e faremos o possível para notificá-lo sobre todas as alterações
            significativas. Consulte a nossa Política de Privacidade regularmente.
            </Text>
            <TextBr></TextBr>
            <TextBr></TextBr>
            <TextBold>Última modificação: 10/06/2021</TextBold>
            </Body>
            <BackButton onPress={handleBackButton}>
            <TextBold>Voltar</TextBold>
            </BackButton>
            </Scroller>
        </Container>
    );
}