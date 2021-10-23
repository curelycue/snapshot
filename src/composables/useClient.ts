import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import client from '@/helpers/client';
import clientEIP712 from '@/helpers/clientEIP712';
import { useWeb3 } from '@/composables/useWeb3';
import { useNotifications } from '@/composables/useNotifications';
import { getInstance } from '@snapshot-labs/lock/plugins/vue3';

export function useClient() {
  const { t } = useI18n();
  const { web3 } = useWeb3();
  const auth = getInstance();
  const { notify } = useNotifications();

  const loading = ref(false);

  async function send(space, type, payload) {
    loading.value = true;
    try {
      // TODO: Add trezor check
      if (web3.value?.walletConnectType !== 'unknown') {
        if (payload.proposal) payload.proposal = payload.proposal.id;
        const isSafe = web3.value?.walletConnectType === 'Gnosis Safe Multisig';
        const fn = isSafe
          ? client.sign.bind(client)
          : client.broadcast.bind(client);

        const result = await fn(
          auth.web3,
          web3.value.account,
          space.id,
          type,
          payload
        );
        return result;
      } else {
        return await sendEIP712(space, type, payload);
      }
    } catch (e: any) {
      console.log('e');
      const errorMessage =
        e && e.error_description
          ? `Oops, ${e.error_description}`
          : t('notify.somethingWentWrong');
      notify(['red', errorMessage]);
      loading.value = false;
      return e;
    } finally {
      loading.value = false;
    }
  }

  async function sendEIP712(space, type, payload) {
    if (type === 'proposal') {
      let plugins = {};
      if (Object.keys(payload.metadata?.plugins).length !== 0)
        plugins = payload.metadata.plugins;
      return await clientEIP712.proposal(auth.web3, web3.value.account, {
        space: space.id,
        type: payload.type,
        title: payload.name,
        body: payload.body,
        choices: payload.choices,
        start: payload.start,
        end: payload.end,
        snapshot: payload.snapshot,
        network: space.network,
        strategies: JSON.stringify(space.strategies),
        plugins: JSON.stringify(plugins),
        metadata: JSON.stringify({})
      });
    } else if (type === 'vote') {
      return await clientEIP712.vote(auth.web3, web3.value.account, {
        space: space.id,
        proposal: payload.proposal.id,
        type: payload.proposal.type,
        choice: payload.choice,
        metadata: JSON.stringify({})
      });
    } else if (type === 'delete-proposal') {
      return await clientEIP712.cancelProposal(auth.web3, web3.value.account, {
        space: space.id,
        proposal: payload.proposal
      });
    } else if (type === 'settings') {
      return await clientEIP712.space(auth.web3, web3.value.account, {
        space: space.id,
        settings: JSON.stringify(payload)
      });
    }
  }

  return { send, clientLoading: computed(() => loading.value) };
}
